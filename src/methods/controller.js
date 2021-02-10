let qlik = window.require('qlik');

export default [
	"$scope",
	"$element",
	function($scope, $element) {

	console.log($scope.layout.tasks)

		let app = qlik.currApp();

		$scope.hyperCube;

		function createHyperCube() {
			if ($scope.hyperCube) {
				console.log('existing cube', $scope.hyperCube);
				app.destroySessionObject($scope.hyperCube.qInfo.qId).then(function (reply) {
					console.log('destroySessionObject result', reply);
				});
			}

			if ($scope.layout.props && !_.isEmpty( $scope.layout.props.dimension1 ) && !_.isEmpty( $scope.layout.props.measure1 ) ) {

				let cubeDef = {
					qDimensions: [{
						qDef: {
							qFieldDefs: [$scope.layout.props.dimension1],
							qSortCriterias: [
								{
									qSortByAscii: 1
								}
							]
						}
					}],
					qMeasures: [{
						qDef: {
							qDef: "=" + $scope.layout.props.measure1
						}
					}],
					qInterColumnSortOrder: [0, 1],
					qInitialDataFetch: [
						{
							qTop: 0,
							qLeft: 0,
							qHeight: 100,
							qWidth: 2
						}
					]
				};

				app.createCube(cubeDef, function (reply) {
					console.log('cube', reply);
					$scope.hyperCube = reply;
				});
			}
		}

		$scope.$watchCollection('layout.props', function ( newVal ) {
			console.log( 'new Vals', newVal );
			createHyperCube();
		});
		createHyperCube();
	}
]
