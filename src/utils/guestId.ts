// src\utils\guestId.ts

// Generate or get persistent guestId for anonymous users
export function getOrCreateGuestId(): string {
  let guestId = localStorage.getItem('guest_id')
  if (!guestId) {
    guestId = crypto.randomUUID() // browser native UUID generator
    localStorage.setItem('guest_id', guestId)
  }
  return guestId
}
