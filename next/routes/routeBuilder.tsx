type RouteParams = Record<string, string | number>;

type RouteFunction = (params?: RouteParams) => string;

type RouteDef = {
	[key: string]: string | RouteDef;
};

type RouteObject<T extends RouteDef> = {
	[K in keyof T]: T[K] extends string
		? RouteFunction
		: RouteObject<T[K] & RouteDef>;
};

function buildRoute(path: string): RouteFunction {
	return (params: RouteParams = {}) => {
		let result = path;
		for (const [key, value] of Object.entries(params)) {
			result = result.replace(`:${key}`, String(value));
		}
		return result;
	};
}

export function registerRoutes<T extends RouteDef>(routes: T): RouteObject<T> {
	const result: Partial<RouteObject<T>> = {};

	for (const [key, value] of Object.entries(routes)) {
		if (typeof value === "string") {
			result[key as keyof T] = buildRoute(
				value,
			) as RouteObject<T>[keyof T];
		} else {
			result[key as keyof T] = registerRoutes(
				value,
			) as RouteObject<T>[keyof T];
		}
	}

	return result as RouteObject<T>;
}
