# 希尔排序
```java
import java.util.Arrays;

/**
 * 希尔排序
 * 希尔排序：算法开始初始化一个步长用来将数组形成一个N有序的数组
 * 之后将N逐步缩小，直到N<1
 * 重复这个步骤
 */
public class Shell extends SortTemp {
    public static void main(String[] args) {
        String[] strings = {"b", "a", "g", "d"};
//        Arrays.sort(strings);
        System.out.println(Arrays.toString(strings));
        Shell shell = new Shell();
        assert !shell.isSorted(strings);
        shell.sort(strings);
        System.out.println(Arrays.toString(strings));
        assert shell.isSorted(strings);
    }

    @Override
    public void sort(Comparable[] a) {
        int len = a.length;
        int h = 1;
        /*初始化排序的步长*/
        while (h <= len) {
            h = h * 3 + 1;
        }
        while (h >= 1) {
            /*循环直到步长小于或等于1*/
            /*内部是步长为h的插入排序*/
            for (int i = 0; i < len; i++) {
                for (int j = i; j > h && less(a[j], a[j - h]); j -= h) {
                    exech(a, j, j - h);
                }
            }
            h = h / 3;
        }
    }
}
```