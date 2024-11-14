import React from 'react'
import { afterEach, beforeEach, describe, expect, it, test, vi } from 'vitest'
import {
  cleanup,
  configure,
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from '@testing-library/react'

import {
  Link,
  Outlet,
  RouterProvider,
  createLink,
  createMemoryHistory,
  createRootRoute,
  createRootRouteWithContext,
  createRoute,
  createRouteMask,
  createRouter,
  redirect,
  useLoaderData,
  useMatchRoute,
  useParams,
  useRouteContext,
  useRouterState,
  useSearch,
} from '../src'
import { useDebugger } from '../src/debugger'
import { flushPromisesInAct } from '../src/wait'

describe('Rerender tests', () => {
  test('when using renderHook it returns a hook with same content to prove rerender works', async () => {
    const useIsFirstRender = () => {
      useDebugger({})
      const renderRef = React.useRef(true)

      if (renderRef.current === true) {
        renderRef.current = false
        return { isFirst: true }
      }

      return { isFirst: renderRef.current }
    }

    const RouterContainer = ({ children }: { children: React.ReactNode }) => {
      const TestComponent = React.useMemo(() => () => {
        useDebugger({}, "TestComponent")
        return <>{children}</>
      }, [children]);

      const componentRef = React.useRef(TestComponent);
      componentRef.current = TestComponent;

      const routeTree = React.useMemo(() => {
        const rootRoute = createRootRoute({
          component: () =>componentRef.current()
        })
        return rootRoute
      }, [])

      const router = React.useMemo(
        () =>
          createRouter({
            routeTree: routeTree,
            history: createMemoryHistory({
              initialEntries: [
                '/',
              ],
            })
          }),
        [routeTree],
      )
      useDebugger({})
      return <RouterProvider router={router}  />
    }

    const { result, rerender } = renderHook(() => useIsFirstRender(), {
      wrapper: RouterContainer,
    })
    await flushPromisesInAct();
    await flushPromisesInAct();
    await flushPromisesInAct();
    await flushPromisesInAct();
    // wait 5 sec to make sure the rerender is not called
    await new Promise((resolve) => setTimeout(resolve, 2000))
    await flushPromisesInAct();

    expect(result.current).toBeTruthy()
    expect(result.current.isFirst).toBeTruthy()
    console.log('calling rerender first time')
    rerender()
    await new Promise((resolve) => setTimeout(resolve, 2000))
    await flushPromisesInAct();

    expect(result.current.isFirst).toBeFalsy()
  })
})
