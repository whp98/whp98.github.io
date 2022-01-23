# 选择排序

```java
/* 排序算法模板 */
import edu.princeton.cs.introcs.StdOut;

public abstract class SortTemp {
    public abstract  void sort(Comparable[] a);

    /**
     * 比大小a小于b返回true
     * @param a
     * @param b
     * @return
     */
    public   boolean less(Comparable a,Comparable b){
        return a.compareTo(b) < 0;
    }


    public   void exech(Comparable[] a,int i, int j){
        Comparable t = a[i]; a[i] = a[j]; a[j] = t;
    }

    public   void show(Comparable[] a){
        for (int i = 0; i < a.length; i++) {
            StdOut.print(a);
        }
        StdOut.println();
    }

    public  boolean isSorted(Comparable[] a){
        for (int i = 0; i < a.length; i++) {
            if (less(a[i],a[i-1])) return false;
        }
        return true;
    }
}
```
选择排序实现
```java
import java.util.Arrays;

/**
 * 选择排序
 * 每次选出最小的，将最小的和当前排序的位置进行交换
 */
public class Selection extends SortTemp {
    public static void main(String[] args) {
        String[] strings = {"b", "a", "g", "d"};
//        Arrays.sort(strings);
        System.out.println(Arrays.toString(strings));
        Selection selection = new Selection();
        assert !selection.isSorted(strings);
        selection.sort(strings);
        System.out.println(Arrays.toString(strings));
        assert selection.isSorted(strings);
    }

    @Override
    public void sort(Comparable[] a) {
        for (int i = 0; i < a.length; i++) {
            int min = i;
            for (int j = i+1; j < a.length; j++) {
                if (less(a[j], a[min])) {
                    min = j;
                }
            }
            exech(a, i, min);
        }
    }
}
```