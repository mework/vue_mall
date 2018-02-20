// 定义本地存储的 key
const key = 'goodsTotalData'

// 获取本地数据
export const getLocalData = () => {
	return JSON.parse(localStorage.getItem(key) || '{}')
}

// 查询本地商品总量
export const getTotalNum = () => {
	const localData = getLocalData()
	let total = 0
	for (var item in localData) {
		total += localData[item]
	}
	return total
}

// 添加本地数据
export const addLocalData = (goodsObj) => {
	const localData = getLocalData()
	if (localData[goodsObj.goodsId]) {
		localData[goodsObj.goodsId] += goodsObj.buycount
	} else {
		localData[goodsObj.goodsId] = goodsObj.buycount
	}
	localStorage.setItem(key, JSON.stringify(localData))
	return getTotalNum()
}

// 通过id删除本地数据
export const removeLocalDataById = (goodsId) => {
	const localData = getLocalData()
	delete localData[goodsId]
	localStorage.setItem(key, JSON.stringify(localData))
	return getTotalNum()
}

// 通过ids删除本地数据
export const removeLocalDataByIds = (goodsIds) => {
	const localData = getLocalData()
	if (goodsIds.indexOf(',') === -1) {
		delete localData[goodsIds]
	} else {
		let goodsArr = goodsIds.split(',')
		goodsArr.forEach(item => {
			delete localData[item]
		})
	}
	localStorage.setItem(key, JSON.stringify(localData))
	return getTotalNum()
}

// 通过对象改变本地数据
export const updateLocalDataByObj = (goodsObj) => {
	const localData = getLocalData()
	for (let item in localData) {
		if (item == goodsObj.goodsId) {
			localData[item] = goodsObj.buycount
		}
	}
	localStorage.setItem(key, JSON.stringify(localData))
	return getTotalNum()
}
