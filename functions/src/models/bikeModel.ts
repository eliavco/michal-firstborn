const { Model, schema, field, ValidationError } = require('firestore-schema-validator');
const colors = require('color-name');

const colorNames: string[] = Object.keys(colors);
const uniqueFields: string[] = ['title', 'image'];

const bikeSchema = schema({
	title: field('Title')
		.string()
		.trim(),
	manufacturer: field('Manufacturer')
		.string()
		.trim()
		.optional(),
	size: field('Size')
		.oneOf(['small', 'medium', 'large']),
	price: field('Price')
		.number(),
	color: field('Color')
		.trim()
		.oneOf(colorNames)
		.optional(),
	stock: field('Stock')
		.number(),
	image: field('Image')
		.string()
		.trim(),
	liscence: field('Liscence')
		.default(false)
		.boolean()
});

class BikeModel extends Model {
	// Path to Cloud Firestore collection.
	static get _collectionPath() {
		return 'bikes';
	}

	// Model Schema.
	static get _schema() {
		return bikeSchema;
	}

	get name() {
		return `${this._data.title} by ${this._data.manufacturer}`;
	}

	toJSON() {
		return {
			id: this._id, // ID of Document stored in Cloud Firestore
			createdAt: this._createdAt, // ISO String format date of Document's creation.
			updatedAt: this._updatedAt, // ISO String format date of Document's last update.
			name: this.name,
			price: this.price,
			stock: this.stock,
			title: this.title,
			manufacturer: this.manufacturer,
			image: this.image,
			color: this.color,
			liscence:  this.liscence
		};
	}
}

const checkExists = async (fieldType: string, value: any): Promise<boolean> => {
	const result = await BikeModel.getBy(fieldType, value);
	if (result) return true;
	return false;
};

uniqueFields.forEach(uniqueField => {
	BikeModel.prehook(uniqueField, async (data: any, bike: BikeModel) => {
		const result = await checkExists(uniqueField, data[uniqueField]);
		if (result) throw new ValidationError(`A doucment with that ${uniqueField}: ${data[uniqueField]} already exists`);
	});
});

exports.Bike = BikeModel;