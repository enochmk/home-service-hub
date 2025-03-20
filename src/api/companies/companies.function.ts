import createHttpError from 'http-errors';
import prisma from '../../db/prisma.db';

export async function validateCompanyIdExist(companyId: number) {
  const company = await prisma.company.findUnique({
    where: {
      id: companyId,
    },
  });

  if (!company) {
    throw createHttpError.NotFound(`Company ID ${companyId} does not exist.`);
  }

  return company;
}
