# 课程表III

说实话这个[题目](https://leetcode-cn.com/problems/course-schedule-iii/)算是寄了，我只能看看解题理解一下喽。

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
         *  对于时间长的优先级低在队列后面，时间短的课程优先级高
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


## 优先队列
PriorityQueue 这个是java的优先队列要使用这个需要写一个对比的操作，上面的代码使用了一个lambda表达式表示使用时间进行对比，这个优先级别使用数字表示大小，数字越低表示优先级越大。
所以如果一个课程可以进行，并且比其他课程都长会排在最前面。


## 本题的思路

基本上是在遍历这个课程的时候不断在优化安排的结果，不断的替换掉，时间占用最多的课程，最终形成一个最好的结果。