import { env } from '@/lib/env'
import type { PageCommandAction } from '@/types/contracts'

export function resolveActionHref(action: PageCommandAction): string {
  if (action.kind === 'route') {
    return action.target
  }

  if (action.kind === 'external') {
    if (action.target === 'env:ios') {
      return env.companionIosUrl ?? '#'
    }
    return action.target
  }

  return '#'
}
