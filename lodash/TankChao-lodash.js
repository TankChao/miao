var TankChao = {
	isNull: function (val) {
		if (val === null) {
			return true
		} else {
			return false
		}
	},
	isNaN: function (val) {
		if (val !== val) {
			return true
		} else {
			return false
		}
	},
	chunk: function (array, size = 1) {
		var a = []
		var result = []
		var l = array.length
		var n = Math.floor(l / size)
		for (var i = 0; i < n; i++) {
			result.push(array.slice(0, size * n))
			a.push(result)
			result.pop()
		}
		if (l !== size * n) {
			result.push(array.slice(size * n))
			a.push(result)
			result.pop()
		}
		return a
	},
	compact: function (array) {
		var result = []
		for (var i = 0; i < array, length; i++) {
			if (array[i]) {
				result.push(array[i])
			}
		}
		return result
	},
	difference: function (array, values) {
		var result = []
		for (var v = 0; v < values.length; v++) {
			for (var a = 0; a < array.length; a++) {
				if (array[a] == values[v]) {
					result.push(array[a])
				}
			}
		}
		return result
	},
}