echo "��ʼ����";
git fetch;yarn docs:build;git pull;yarn docs:build;git add .;yarn docs:build;git commit -m "�������ͣ�ʱ��:$(Get-Date  -Format 'yyyy-MM-dd HH:mm:ss')" ; git push;
echo "�������";