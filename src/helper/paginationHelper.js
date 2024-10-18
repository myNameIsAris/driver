const getPagination = (pageNumber, pageSize) => {
	const limit = pageSize ? +pageSize : 1000;
	const offset = pageNumber ? pageNumber * limit - limit : 0;
	return {
		limit,
		offset,
	};
};

const getPagingData = (dataInput, pageNumber, pageSize) => {
	const { count: totalItems, rows: data } = dataInput;
	const page = pageNumber ? +pageNumber : 0;
	const totalPages = Math.ceil(totalItems / pageSize);
	const limit = pageSize;

	return {
		data,
		totalItems,
		page,
		limit,
		totalPages,
	};
};

module.exports = {
	getPagination,
	getPagingData,
};
