import * as JSGantt from 'jsgantt-improved';

import 'jsgantt-improved/dist/jsgantt.css';

function setDataToChart(chart, tasks, relations) {

	const correctRelations = relations.filter(el => (el.to.qText !== '-') && (el.from.qText !== '-'));

	tasks.forEach((el, ind, arr) => {
		const task = {};

		let className = 'gtaskblue';

		if (!Date.parse(el.end.qText)) {
			className = 'invisible';
		}
		const dep = correctRelations.find(relEl => relEl.to.qText === el.id.qText);

		let depId = null;

		if (dep) {
			const foundTask = arr.find(task => task.id.qText === dep.from.qText);
			depId = foundTask.id.qElemNumber + 1;
		}

		let parentId = 0;

		if (el.parent.qText !== '-') {
			const parent = arr.find(task => task.id.qText === el.parent.qText);
			if (parent)
				parentId = parent.id.qElemNumber + 1;
		}
		// let parentId = 0;
		// if (el.parent.qText !== '-') {
		// 	const parent = arr.find(task => task.id.qText === el.parent.qText);
		// 	parentId = parent.id.qElemNumber + 1;
		// }
		task.pID = el.id.qElemNumber + 1;
		task.pName = el.name.qText;
		task.pClass = 'gtaskblue';
		task.pStart = el.start.qText.split('.').reverse().join('-');
		task.pEnd = el.end.qText.split('.').reverse().join('-');
		task.pClass = className;
		task.pStart = el.start.qText;
		task.pEnd = el.end.qText;
		task.pComp = el.progress.qText;
		task.pGantt = chart;
		task.pParent = parentId;
		task.pGroup = el.type.qText === 'Target' ? 1 : 0;
		task.pOpen = 1;
		task.pDepend = depId;

		chart.AddTaskItemObject(task);
	});
}

export default function($element, layout) {

	const chart = new JSGantt.GanttChart($element[0], 'day');

	chart.setOptions({
		vCaptionType: 'Complete',  // Set to Show Caption : None,Caption,Resource,Duration,Complete,
		vQuarterColWidth: 270,
		vDateTaskDisplayFormat: 'day dd month yyyy', // Shown in tool tip box
		vDayMajorDateDisplayFormat: 'mon yyyy - Week ww',// Set format to dates in the "Major" header of the "Day" view
		vWeekMinorDateDisplayFormat: 'dd mon', // Set format to display dates in the "Minor" header of the "Week" view
		vLang: 'ru',
		vShowTaskInfoLink: 1, // Show link in tool tip (0/1)
		vShowEndWeekDate: 0,  // Show/Hide the date for the last day of the week in header for daily
		vShowRes: 0,
		vShowCost: 0,
		vShowComp: 0,
		vShowDur: 0,
		vShowStartDate: 0,
		vShowEndDate: 0,
		vUseSingleCell: 10000, // Set the threshold cell per table row (Helps performance for large data.
		vFormatArr: ['Day', 'Week', 'Month','Quarter'], // Even with setUseSingleCell using Hour format on such a large chart can cause issues in some browsers,
		vEvents: {
			afterDraw: ()=>{
				const taskNameColumn = $element[0].querySelectorAll('.gtaskname');

				if (!taskNameColumn.length)
					return;

				taskNameColumn.forEach((el, ind) => {
					if (ind <= 1 || ind === taskNameColumn.length - 1) {
						return;
					}
					const indSpan = document.createElement("span");
					indSpan.append(`${ind - 1} `);
					el.querySelector('div').prepend(indSpan);
				});

				const taskNameHeader = taskNameColumn[1];

				taskNameHeader.firstChild.data = 'Цель/Задача';
				taskNameHeader.style.fontSize = '10px';
				taskNameHeader.style.fontWeight = '700';
				taskNameHeader.style.textAlign = 'center';
			}
		}
	});

	setDataToChart(chart, layout.tasks, layout.relations)

	chart.Draw();
}
