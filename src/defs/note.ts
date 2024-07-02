export interface Note {
	userID: string;
	noteID: string;
	dateCreated: Date;
	dateLastEdited: Date;
	title: string;
	content: string;
}