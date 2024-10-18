const axios = require("axios");
const SAPSyncBaseUrl = 'http://api.ugems.id'
const sapData = {}

sapData.getData = async () => {
	// let token = req.headers.authorization;
    
    try {
        const restApi = await axios.get(`${SAPSyncBaseUrl}/sap-sync/employee`, {
            // headers: {
            //     Authorization: `Bearer ${token}`,
            // },
        })

        return restApi.data.data
    } catch (error) {
        console.error('error', error)
        return null
    }
}

sapData.fetchSap = async (
	limit = "",
	page = "",
	name = "",
	nik = "",
	company = "",
	search = "",
	order = ""
	
) => {
	let res = [];
	let params = (`?limit=${limit}&page=${page}&fullname=${name}&nik=${nik}&company_name=${company}`);
	
	// let param = [];

	// if (limit) {
	// 	param.push(`?limit=${limit.trim()}`);
	// }

	// if (page) {
	// 	param.push(`&page=${page.trim()}`);
	// }

	// if (name) {
	// 	param.push(`&fullname=${name.trim()}`);
	// }

	// if (nik) {
	// 	param.push(`&nik=${nik.trim()}`);
	// }

	// if (company) {
	// 	param.push(`&company_name=${company.trim()}`);
	// }

	// param.join("");

	try {
		res = await axios.get(`${SAPSyncBaseUrl}/sap-sync/employee${params}`, {
			// headers: {
			// 	Authorization: `Bearer ${token}`,
			// },
		});
	} catch (error) {
		console.error("error", error);
	} 
	return res.data.data;
};

module.exports = sapData;
