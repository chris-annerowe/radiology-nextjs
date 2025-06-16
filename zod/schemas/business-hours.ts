import z from "../zod";



const BusinessHoursSchema = z.object({
    openingTime: z.number({message: "Please enter a valid Opening Time"}),
    closingTime: z.number({message: "Please enter a valid Closing Time"}),
    interval: z.number({message: "Interval must be a number"})
});

export default BusinessHoursSchema;