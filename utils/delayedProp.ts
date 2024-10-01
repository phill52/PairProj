export default function delayedProp<T>(value: T): Promise<T> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(value);
		}, 3000);
	});
}
