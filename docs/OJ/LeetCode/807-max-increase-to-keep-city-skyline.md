# leetcode 807 保持城市的天际线




这个[题目](https://leetcode-cn.com/problems/max-increase-to-keep-city-skyline/)乍一看有点懵逼，感觉题目的描述是有点简短了，仔细观察之后发现题目的描述，其实很简单，从上到下看每一列最大的那一个，就是天际线，从左到右看每一行最大的那个就是另一条天际线。

这个题目就是看在不影响左右的最大值的情况下可以在每一个点中增加的最大值，最后将每一个点的高度加和起来就是最终的结果。


```java
class Solution {
    /* 
    首先求出每行每列的天际线，最后将每行每列的最大值加起来就行了
    将每个点将每列每行的的天际线值的最小值加起来
    **/
    public int maxIncreaseKeepingSkyline(int[][] grid) {
        int result  = 0;
        /* 求天际线 */
        int[] max1 = new int[grid[0].length];
        int[] max2 = new int[grid.length];
        for (int i = 0; i <grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                max2[i] = Math.max(grid[i][j], max2[i]);
            }
        }
        for (int i = 0; i <grid[0].length; i++) {
            for (int j = 0; j < grid.length; j++) {
                max1[i] = Math.max(grid[j][i], max1[i]);
            }
        }

        /* 计算每个点可以增高的值 */
        for (int i = 0; i < max2.length; i++) {
            for (int j = 0; j < max1.length; j++) {
                result += (Math.min(max1[j], max2[i])-grid[i][j]);                
            }
        }
        
        return result;
    }
}
```

不得不说这个题还是比较简单的，因为上面的连续三个双层for循环竟然超过了100%的人,不过内存占用并不是很好。

```txt
Accepted
133/133 cases passed (0 ms)
Your runtime beats 100 % of java submissions
Your memory usage beats 88.45 % of java submissions (38 MB)

```
# 其他思路

让我们看看其他人的思路

leetcode官方
```java
class Solution {
    public int maxIncreaseKeepingSkyline(int[][] grid) {
        int n = grid.length;
        int[] rowMax = new int[n];
        int[] colMax = new int[n];
        /* 一次遍历就完成了最大值的求解 */
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                rowMax[i] = Math.max(rowMax[i], grid[i][j]);
                colMax[j] = Math.max(colMax[j], grid[i][j]);
            }
        }
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                ans += Math.min(rowMax[i], colMax[j]) - grid[i][j];
            }
        }
        return ans;
    }
}

作者：LeetCode-Solution
链接：https://leetcode-cn.com/problems/max-increase-to-keep-city-skyline/solution/bao-chi-cheng-shi-tian-ji-xian-by-leetco-n2lu/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

官方的解题只用了一次循环就完成了两个最大值得求解，而且说用到了贪心的思想，那么贪心是啥。

经过搜索，我了解到，贪心算法是一个过程，首先建立数学模型，然后将问题分解，将问题拆解成一个一个的子问题，寻找子问题的最优解，最后将局部的最优解组合成最终的解。


回归的本问题的解决上，本问题是求这个矩阵总的升高，可以分解成单个点的问题。

对于每一个点最高的情况就是  (最高能升高的距离[i][j] - grid[i][j])

求解最高的升高的距离是 min(max1[i],max2[j])


最后按照这个思路将这个步骤重复多次就可以形成这道题目的解了。


基本上这个不算是中等的题目，应该是比较偏简单的。