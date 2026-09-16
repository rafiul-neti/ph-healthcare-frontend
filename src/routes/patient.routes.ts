const prefix = "/patient";

export const patientRoutes = [
  {
    title: "Schedule",
    items: [
      {
        title: "Overview",
        url: `${prefix}`,
      },
      {
        title: "My Bookings",
        url: `${prefix}/bookings`,
      },
    ],
  },
];
