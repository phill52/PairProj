import { registerRoutes } from "./routeBuilder";

export const routes = registerRoutes({
	home: "/",
	login: "/login",
	users: {
		profile: "/profile/:id",
	},
	projects: {
		search: "/projects/search",
		project: "/projects/:id",
	},
});
