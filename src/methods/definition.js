export default {
	type: "items",
	component: "accordion",
	items: {
		tasksData: {
			label: "Задачи",
			ref: "tasks",
			items: {
				dim1: {
					ref: "tasks.dimension1",
					label: "ID задачи",
					type: "string",
					component: "expression",
					expression: "optional"
				},
				dim2: {
					ref: "tasks.dimension2",
					label: "Название задачи",
					type: "string",
					component: "expression",
					expression: "optional"
				},
				mea1: {
					ref: "tasks.measure1",
					label: "Measure",
					type: "string",
					component: "expression",
					expression: "optional"
				}
			},
		},
		relationsData: {
			label: "Связи",
			ref: "relations",
			items: {
				dim1: {
					ref: "relations.dimension1",
					label: "ID потомка",
					type: "string",
					component: "expression",
					expression: "optional"
				},
				dim2: {
					ref: "relations.dimension2",
					label: "ID родителя",
					type: "string",
					component: "expression",
					expression: "optional"
				},
				mea1: {
					ref: "relations.measure1",
					label: "Тип связи",
					type: "string",
					component: "expression",
					expression: "optional"
				}
			},
		},
		appearance: {
			uses: "settings",
			items: {
			}
		}
	},
}
