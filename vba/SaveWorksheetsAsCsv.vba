Public Sub SaveWorksheetsAsCsv()
' https://www.extendoffice.com/documents/excel/2980-excel-save-export-each-sheet-as-csv.html
' https://stackoverflow.com/questions/12688311/export-sheet-as-utf-8-csv-file-using-excel-vba
Dim xWs As Worksheet
Dim xDir As String
Dim folder As FileDialog
Set folder = Application.FileDialog(msoFileDialogFolderPicker)
If folder.Show <> -1 Then Exit Sub
xDir = folder.SelectedItems(1)
For Each xWs In Application.ActiveWorkbook.Worksheets
xWs.SaveAs xDir & "\" & xWs.Name, xlCSVUTF8
Next
End Sub
