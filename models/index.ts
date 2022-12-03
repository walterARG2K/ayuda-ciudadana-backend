import { Report } from "./report";
import { User } from "./user";
import { Auth } from "./auth";

User.hasMany(Report);
Report.belongsTo(User);
User.hasOne(Auth);
Auth.belongsTo(User);

export { User, Report, Auth };
