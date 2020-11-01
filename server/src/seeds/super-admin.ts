import { getRepository } from "typeorm";
import { User, UserRoles } from "../entity/user.entity";
import { hashSync } from "bcrypt";
import { logger } from "../utils/logger";

export const seedSuperAdmin = async () => {
  try {
    const {
      SALT_ROUNDS,
      SUPER_ADMIN_EMAIL,
      SUPER_ADMIN_PASSWORD,
    } = process.env;

    const hashSuperAdminPassword = (): string =>
      hashSync(SUPER_ADMIN_PASSWORD, Number(SALT_ROUNDS));

    let superAdmin = await getRepository(User).findOne({
      email: SUPER_ADMIN_EMAIL,
    });

    if (!superAdmin) {
      const newSuperAdmind = getRepository(User).create({
        email: SUPER_ADMIN_EMAIL,
        name: "Super Admin",
        password_hash: hashSuperAdminPassword(),
        role: UserRoles.SUPER_ADMIN,
      });

      superAdmin = await getRepository(User).save(newSuperAdmind);

      logger("No super admin, created new one");
    } else {
      await getRepository(User).update(superAdmin, {
        role: UserRoles.SUPER_ADMIN,
        password_hash: hashSuperAdminPassword(),
      });

      logger("Super admin exists, updated role to SUPER ADMIN", "success");
    }
  } catch (e) {
    console.log(e);
    logger("Error while super admin seed", "error");
  }
};
