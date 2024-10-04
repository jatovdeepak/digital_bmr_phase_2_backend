/*
  Warnings:

  - You are about to drop the `Free_Blank_University_Admission_Form_Templatedocx_schema` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sample3docx_schema` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropTable
DROP TABLE [dbo].[Free_Blank_University_Admission_Form_Templatedocx_schema];

-- DropTable
DROP TABLE [dbo].[sample3docx_schema];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
