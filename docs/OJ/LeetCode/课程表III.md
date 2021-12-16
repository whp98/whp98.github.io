# 课程表III

说实话这个题目算是寄了，我只能看看解题理解一下喽。

```java
class Solution {
    public int scheduleCourse(int[][] courses) {
        /**
         * 按课程截止时间升序排序 
         * 这主要是来自于生活的尝试，面临多门考试的时候，一般情况下肯定也是先复习靠在前面的科目
         * 在一些特定情况下，例如同一天有多门考试，那么肯定是先复习比较简单啊一门科目~
         */
        Arrays.sort(courses, (a, b) -> a[1] - b[1]);
        /**
         * 定义一个优先队列（最大堆）
         * 按照降序排列（学习时长）
         */
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> b[0] - a[0]);
        // 记录总学习时长
        int total = 0;
        // 按截止时间从近到远遍历课程
        for (int[] course : courses) {
            /**
             * 如果总时长不会超过截止时间，那么，当前这门课程可以选择，进入队列
             * 如果超过了，就要进行比较（和已经入对列的元素）(取出队列中最长的课程，和当前的课程进行对比)，选择学习时长较短的课程
             */
            if (total + course[0] <= course[1]) {
                total += course[0];
                heap.offer(course);
                /* 队列不为空的情况下，选择队列头的元素（时长最大）和当前的对比 */
            } else if (!heap.isEmpty() && heap.peek()[0] > course[0]) {
                /* 将本课程入队，原先的课程出队 */
                total = total - heap.poll()[0] + course[0];
                heap.offer(course);
            }
        }
        return heap.size();
    }
}


```


## 深度优先队列




## 本题的思路