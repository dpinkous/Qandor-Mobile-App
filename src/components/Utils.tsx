/* tslint:disable:indent */
export const chunkArray = (array: any, chunk=2) => {
	let resultArray = [];
	let tmpArray = array;
	while (tmpArray.length > 0) {
	  resultArray.push(tmpArray.slice(0, chunk));
	  tmpArray = tmpArray.slice(chunk);
	}
	return resultArray;
  }

export const renderNames = (users: any, search: boolean = false, userID: any = null) => {
	if (users.length === 1) {
		return users[0].full_name ? users[0].full_name : users[0].username;
  }
  // tslint:disable-next-line:align
  if (!search) {
    users = users.filter((user: any) => user.id !== parseInt(userID, 10));
  }
	const group = new Array();
	users.slice(0, 3).forEach((user: any) => {
		let username = user.full_name ? user.full_name : user.username;
		username = username.split(' ')[0];
		group.push(username);
	});
	const newGroup = group.join(' & ');
	if (users.length > 3) {
		return newGroup + ' ...';
	}
	return newGroup;
};

export const findNewChannels = (channels: any) => {
	let newUnread = 0;
	channels.map((channel: any) => {
		newUnread += channel.new ? 1 : 0;
	});
	return newUnread;
};

export const getTime = (date: string) => {
  if (!date) {
    return '';
	}
  const newDate = new Date(date);
  const minutes = newDate.getMinutes();
  let hours = newDate.getHours();
  const ampm = hours >= 12 && hours < 24 ? 'PM' : 'AM';
	hours = hours % 12 ? hours % 12 : 12;

  return `${hours < 10 ? '0' + hours : hours }:${minutes < 10 ? '0' + minutes : minutes } ${ampm}`;
};
