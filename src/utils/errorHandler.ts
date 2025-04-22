// // utils/errorHandler.ts
// import { Response } from 'express';

// export const errorHandler = (res: Response, error: unknown) => {
//   if (error instanceof Error) {
//     return res.status(400).json({ message: error.message });
//   }
//   return res.status(500).json({ message: 'Ett oväntat fel inträffade' });
// };
// //instanceof ???
// //förklaring: error instanceof Error: Den här kontrollen gör att vi kan säkerställa att error är en instans av Error-klassen
// //  (det vill säga en vanlig JavaScript error). Om detta stämmer så kan vi använda error.message utan problem.