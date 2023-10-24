"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const errorLog = (0, debug_1.default)('app:errors');
// Error Propagation:
// If an error is thrown in any middleware or route and it's passed to next, 
// it will skip all subsequent regular middleware and routes and go straight to the error-handling middleware
// The error-handling middleware should be the last middleware to add to our app to catch errors from all the preceding routes and middleware.
class ErrorMiddleware {
    handle(err, req, res, next) {
        const message = err instanceof Error ? err.message : String(err); // Convert error to string
        errorLog(message);
        res.status(500).send("Something went wrong!");
        next(err);
    }
}
exports.default = new ErrorMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbW1vbi9taWRkbGV3YXJlL2Vycm9yLm1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxrREFBMEI7QUFFMUIsTUFBTSxRQUFRLEdBQW9CLElBQUEsZUFBSyxFQUFDLFlBQVksQ0FBQyxDQUFDO0FBRXRELHFCQUFxQjtBQUNyQiw2RUFBNkU7QUFDN0UsNkdBQTZHO0FBQzdHLDhJQUE4STtBQUM5SSxNQUFNLGVBQWU7SUFDbkIsTUFBTSxDQUNKLEdBQVksRUFDWixHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQjtRQUUxQixNQUFNLE9BQU8sR0FBRyxHQUFHLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQywwQkFBMEI7UUFDNUYsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWxCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1osQ0FBQztDQUNGO0FBRUQsa0JBQWUsSUFBSSxlQUFlLEVBQUUsQ0FBQyJ9