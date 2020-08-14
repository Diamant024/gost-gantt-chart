import * as JSGantt from 'jsgantt-improved';
import axios from 'axios';
import 'jsgantt-improved/dist/jsgantt.css';

export default async function($element, layout) {

	const baseURL = 'https://rfs-gap.gost-group.com/api',
		dataPath = '/gantt/gantt_1_1?format=expanded',
		relationsPath = '/gantt/gantt_relation?format=expanded';

	const gant = new JSGantt.GanttChart($element[0], 'day');

	const transport = axios.create({
		baseURL
	});


	gant.setOptions({
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

				taskNameColumn.forEach((el, ind) => {
					if (ind <= 1) {
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

	let getData = transport.get(dataPath),
		getRelations = transport.get(relationsPath);

	await Promise.all([getData, getRelations])
		.then(([{data: gantData}, {data: relData}]) => {
			const filteredRelData = relData.filter(el => (el.to.qText !== '-') && (el.from.qText !== '-'));
			console.log('Зависимости', filteredRelData);
			gantData.forEach((el, ind, arr) => {
				const d = {};
				const dep = filteredRelData.find(relEl => relEl.to.qText === el.id.qText);
				let depId = null;
				if (dep) {
					const foundTask = arr.find(task => task.id.qText === dep.from.qText);
					depId = foundTask.id.qElemNumber + 1;
				}
				let parentId = 0;
				if (el.parent.qText !== '-') {
					const parent = arr.find(task => task.id.qText === el.parent.qText);
					parentId = parent.id.qElemNumber + 1;
				}
				d.pID = el.id.qElemNumber + 1;
				d.pName = el.name.qText;
				d.pClass = 'gtaskblue';
				d.pStart = el.start.qText.split('.').reverse().join('-');
				d.pEnd = el.end.qText.split('.').reverse().join('-');
				d.pComp = el.progress.qText;
				d.pGantt = gant;
				d.pParent = parentId;
				d.pGroup = el.type.qText === 'Target' ? 1 : 0;
				d.pOpen = 1;
				d.pDepend = depId;

				gant.AddTaskItemObject(d);
			});

		});

	gant.Draw();
}
