import { Report } from "./report";
import { User } from "./user";

User.hasMany(Report);
Report.belongsTo(User);

export { User, Report };
