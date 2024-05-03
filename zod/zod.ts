import { z } from "zod";


const customErrorMap: z.ZodErrorMap = (issue, ctx) => {

    
    if (issue.code === z.ZodIssueCode.invalid_string) {
        if (issue.validation === "email") {
            return { message: "Please enter a valid email" };
        }

        if (issue.validation === "url") {
            return { message: "Please enter a valid URL" };
        }
    }

    return { message: ctx.defaultError };
};

z.setErrorMap(customErrorMap);

export default z;