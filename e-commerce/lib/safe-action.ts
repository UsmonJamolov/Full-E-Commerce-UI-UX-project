// import { createSafeActionClient } from 'next-safe-action'

// export const actionClient = createSafeActionClient()

import { createSafeActionClient, SafeActionResult } from 'next-safe-action'

export const actionClient = createSafeActionClient()
export type { SafeActionResult };