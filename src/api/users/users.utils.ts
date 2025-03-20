export async function addCompanyAdminFilter(
  roleName: string,
  companyId: string,
) {
  return { roleName, companyId };
}
