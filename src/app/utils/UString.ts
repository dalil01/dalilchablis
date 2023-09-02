export class UString {

	public static capitalize(str: string): string {
		return str && str[0].toUpperCase() + str.slice(1);
	}

}