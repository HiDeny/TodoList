import { listsArr } from '../components/list/createList';

// Sidebar
function sidebarMenu() {
	const sidebar = document.createElement('div');
	sidebar.className = 'sidebar';

	const sidebarContent = createSidebarContent(listsArr);
    sidebar.append(sidebarContent);


    return sidebar;
}

function createSidebarContent(listsArr) {
	const sidebarContent = document.createElement('ul');
	sidebarContent.className = 'sidebarContent';

	listsArr.forEach((list) => {
		const optionElement = document.createElement('li');
		optionElement.setAttribute('class', list.title);
		optionElement.textContent = list.title;
		sidebarContent.append(optionElement);
	});

	return sidebarContent;
}


export { sidebarMenu };
