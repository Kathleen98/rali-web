import z, { ZodError } from "zod";

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NEXT_PUBLIC_RALI_API_URL : z.url()
})

const processEnv = {
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_RALI_API_URL: process.env.NEXT_PUBLIC_RALI_API_URL
}

export type Env = z.infer<typeof envSchema>

let env: Env;

try{
  env = envSchema.parse(processEnv)
}catch(e){
  if(e instanceof ZodError){
    throw new Error(`${e.message}: validation failed`)
  }
  throw e;
}

export { env };

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}