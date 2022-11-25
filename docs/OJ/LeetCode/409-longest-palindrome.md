# 最长回文子串

## 暴力解法

```java
import org.junit.Assert;
import org.junit.Test;

public class S1 {
    /*暴力算法*/
    public String longestPalindrome(String s) {
        String maxLongStr = "";
        int maxLong = 0;
        int len = s.length();
        if (isStrPalindrome(s)){
            return s;
        }
        for (int i = 0; i < len; i++) {
            for (int j = i+1; j < len+1; j++) {
                /*待测试字符串*/
                String testStr = s.substring(i, j);
                //System.out.printf("{%s} {%s}\n",s,testStr);
                if (isStrPalindrome(testStr) && testStr.length() > maxLong) {
                    maxLong = testStr.length();
                    maxLongStr = testStr;
                }
            }
        }
        return maxLongStr;
    }

    /*判断一个字符串是不是回文字符串*/
    public boolean isStrPalindrome(String s) {
        if (s == null) {
            return false;
        }
        if (s.length() == 1) {
            return true;
        }
        /*判断是否每个位置都满足回文条件*/
        int len = s.length();
        for (int i = 0; i < s.length() / 2; i++) {
            if (s.charAt(i) != s.charAt(len - i - 1)) {
                return false;
            }
        }
        return true;
    }

    /*生成大量字符串进行穷举*/
    @Test
    public void testStrIsBoolean() {
        Assert.assertTrue(isStrPalindrome("s"));
        Assert.assertTrue(isStrPalindrome("ss"));
        Assert.assertTrue(isStrPalindrome("aba"));
        Assert.assertTrue(isStrPalindrome("bab"));
        Assert.assertFalse(isStrPalindrome("ab"));
        Assert.assertFalse(isStrPalindrome("cde"));
    }

    /*试用测试案例,进行测试*/
    @Test
    public void testDefaultTestCase() {
        Assert.assertEquals("bab", longestPalindrome("babad"));
        Assert.assertEquals("bb", longestPalindrome("cbbd"));
        Assert.assertEquals("a", longestPalindrome("a"));
        Assert.assertEquals("bb", longestPalindrome("bb"));
        Assert.assertEquals("bb", longestPalindrome("abb"));
    }
}
```