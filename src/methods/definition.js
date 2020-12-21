export default {
	type: "items",
	component: "accordion",
	items: {
		appearancePanel: {
			uses: "settings",
			items: {
				baseURL: {
					ref: "baseURL",
					type: "string",
					label: "API base url",
					defaultValue: ""
				}
			}
		}
	},
}
