// Service abstraction for Bookings & Packages — ready for Supabase / Firebase connection

export const bookingService = {
  async createBooking(bookingData) {
    // Simulate backend latency
    await new Promise(r => setTimeout(r, 800));

    const bookingId = `MT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking = {
      id: bookingId,
      ...bookingData,
      status: 'Confirmed',
      createdAt: new Date().toISOString().split('T')[0]
    };

    return { success: true, booking: newBooking };
  },

  async verifyAgency(agencyId) {
    await new Promise(r => setTimeout(r, 500));
    return { success: true, agencyId, status: 'Verified' };
  }
};
