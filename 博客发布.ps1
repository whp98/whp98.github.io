echo "��ʼ����";
git fetch;yarn docs:build;git pull;git add .;git commit -m "�������ͣ�ʱ��:$(Get-Date  -Format 'yyyy-MM-dd HH:mm:ss')" ; git push;
echo "�������";