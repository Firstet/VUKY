import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();
async function main(){
 const email=process.env.PLATFORM_OWNER_EMAIL;
 const password=process.env.PLATFORM_OWNER_PASSWORD;
 if(email && password && !await prisma.platformUser.findUnique({where:{email}})){
  await prisma.platformUser.create({data:{email,passwordHash:await bcrypt.hash(password,12),role:"SUPER_ADMIN"}});
 }
 const plans=[
 {key:"store",name:"VUKY Store",description:"E-commerce and selling tools",monthlyPriceNgn:5000,commissionPercent:5,productLimit:100,staffLimit:2,aiCreditsMonthly:0,automationLimit:0,features:["Online storefront","Product listings and categories","Orders and inventory","Customer records","Basic reports"]},
 {key:"intelligence",name:"VUKY Intelligence",description:"Commerce with practical AI assistance",monthlyPriceNgn:10000,commissionPercent:3,productLimit:1000,staffLimit:5,aiCreditsMonthly:1000,automationLimit:10,features:["Everything in Store","AI product descriptions","AI business assistant","Sales insights","Marketing copy assistance"]},
 {key:"business",name:"VUKY Business OS",description:"Full business operating system",monthlyPriceNgn:25000,commissionPercent:1.5,productLimit:10000,staffLimit:25,aiCreditsMonthly:5000,automationLimit:100,features:["Everything in Intelligence","CRM and expenses","Staff and tasks","Automation","Advanced analytics"]}
 ];
 for(const p of plans){const {features,...rest}=p;await prisma.plan.upsert({where:{key:p.key},update:{...rest,features},create:{...rest,features}})}
 for(const p of [{key:"monthly",label:"Monthly",months:1,discountPercent:0},{key:"quarterly",label:"Quarterly",months:3,discountPercent:5},{key:"biannual",label:"Biannually",months:6,discountPercent:6},{key:"annual",label:"Annually",months:12,discountPercent:8}])await prisma.billingPeriod.upsert({where:{key:p.key},update:p,create:p});
}
main().finally(()=>prisma.$disconnect());
