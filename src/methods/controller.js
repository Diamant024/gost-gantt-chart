let qlik = window.require('qlik');

export default [
	"$scope",
	"$element",
	function($scope, $element) {

		const app = qlik.currApp();

		/*$scope.$watchCollection('layout.data', () => {
			createHyperCube().then(() => {
				$scope.component.paint($element, $scope.layout)
			})
		});*/

		app.selectionState().OnData.bind(() =>
			createHyperCube().then(() => {
				$scope.component.paint($element, $scope.layout)
			})
		);

		function createHyperCube() {

			let tasksCubeDef = getTasksHyperCubeDef($scope.layout.tasks),
				relationsCubeDef = getRelationsHyperCubeDef($scope.layout.relations);

			let requests = [app.createCube(tasksCubeDef), app.createCube(relationsCubeDef)];

			return Promise.all(requests).then(([tasksCube, relationsCube]) => {
				const tasks = tasksCube.layout.qHyperCube.qDataPages[0].qMatrix.map(item => {
					return { id: item[0], name: item[1], parent: item[5], type: item[6], start: item[2], end: item[3], progress: item[4] }
				})

				const relations = relationsCube.layout.qHyperCube.qDataPages[0].qMatrix.map(item => {
					return { to: item[0], from: item[1] }
				})

				$scope.layout.data = { tasks, relations }


				app.destroySessionObject(tasksCube.id);
				app.destroySessionObject(relationsCube.id);
			})
		}

		return createHyperCube();
	}
]

function getTasksHyperCubeDef(tasksProps) {
	let cubeDef = {
		qDimensions: [
			{
				qDef: {
					qFieldDefs: [tasksProps.id]
				}
			},
			{
				qDef: {
					qFieldDefs: [tasksProps.name]
				}
			}
		],
		qMeasures: [
			{ qDef: { qDef: tasksProps.start } },
			{ qDef: { qDef: tasksProps.end } },
			{ qDef: { qDef: tasksProps.progress } },
			{ qDef: { qDef: tasksProps.parent } },
			{ qDef: { qDef: tasksProps.type } },
		],
		qInitialDataFetch: [
			{
				qTop: 0,
				qLeft: 0,
				qHeight: 1000,
				qWidth: 7
			}
		]
	};

	return cubeDef;
}

function getRelationsHyperCubeDef(relationsProps) {
	let cubeDef = {
		qDimensions: [
			{
				qDef: {
					qFieldDefs: [relationsProps.to]
				}
			},
			{
				qDef: {
					qFieldDefs: [relationsProps.from]
				}
			}
		],
		qMeasures: [{
			qDef: {
				qDef: relationsProps.type
			}
		}],
		qInitialDataFetch: [
			{
				qTop: 0,
				qLeft: 0,
				qHeight: 3333,
				qWidth: 3
			}
		]
	};

	return cubeDef;
}