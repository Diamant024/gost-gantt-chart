export default {
	type: "items",
	component: "accordion",
	items: {
		tasksData: {
			label: "Задачи",
			ref: "tasks",
			items: {
				id: {
					ref: "tasks.id",
					label: "ID задачи",
					type: "string",
					component: "expression",
					expression: "optional"
				},
				name: {
					ref: "tasks.name",
					label: "Название задачи",
					type: "string",
					component: "expression",
					expression: "optional"
				},
				parent: {
					ref: "tasks.parent",
					label: "ID родителя задачи",
					type: "string",
					component: "expression",
					expression: "optional"
				},
				type: {
					ref: "tasks.type",
					label: "Тип задачи",
					type: "string",
					component: "expression",
					expression: "optional"
				},
				start: {
					ref: "tasks.start",
					label: "Дата начала",
					type: "string",
					component: "expression",
					expression: "optional"
				},
				end: {
					ref: "tasks.end",
					label: "Дата конца",
					type: "string",
					component: "expression",
					expression: "optional"
				},
				progress: {
					ref: "tasks.progress",
					label: "Прогресс",
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
				to: {
					ref: "relations.to",
					label: "ID потомка",
					type: "string",
					component: "expression",
					expression: "optional"
				},
				from: {
					ref: "relations.from",
					label: "ID родителя",
					type: "string",
					component: "expression",
					expression: "optional"
				},
				type: {
					ref: "relations.type",
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
