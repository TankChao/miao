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
	chunk: function (ary, size) {
		var a = []
		var result = []
		var l = ary.length
		var n = Math.floor(l / 2)
		for (var i = 0; i < n; i++) {
			result.push(ary.slice(0, 2n))
			a.push(result)
			result.pop()
		}
		if (l !== 2n) {
			result.push(ary.slice(2n))
			a.push(result)
			result.pop()
		}
	},
}