
function damerauLevenshteinDistance(str1, str2) {
    var dp = Array.from({ length: str1.length + 1 }, () =>
        Array(str2.length + 1).fill(0)
    );

    for (var i = 0; i <= str1.length; i++) {
        dp[i][0] = i;
    }

    for (var j = 0; j <= str2.length; j++) {
        dp[0][j] = j;
    }

    for (var i = 1; i <= str1.length; i++) {
        for (var j = 1; j <= str2.length; j++) {
            var cost = str1.charAt(i - 1) === str2.charAt(j - 1) ? 0 : 1;
            dp[i][j] = Math.min(
                dp[i - 1][j] + 1,
                Math.min(dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost)
            );
            if (
                i > 1 &&
                j > 1 &&
                str1.charAt(i - 1) === str2.charAt(j - 2) &&
                str1.charAt(i - 2) === str2.charAt(j - 1)
            ) {
                dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + cost);
            }
        }
    }
    return dp[str1.length][str2.length];
}

var keywords = ['狗飼料', '貓飼料', '飼料', '貓', '狗'];

document.getElementById('search').addEventListener('input', function (e) {
    var searchTerm = e.target.value;
    var suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = '';

    if (searchTerm) {
        keywords
            .sort((a, b) => damerauLevenshteinDistance(searchTerm, a) - damerauLevenshteinDistance(searchTerm, b))
            .forEach(function (keyword) {
                var div = document.createElement('div');
                div.textContent = keyword;
                suggestions.appendChild(div);
            });
    }
});
