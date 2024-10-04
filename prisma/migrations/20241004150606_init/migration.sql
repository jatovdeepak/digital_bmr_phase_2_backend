BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[FileConversion] (
    [id] INT NOT NULL IDENTITY(1,1),
    [fileName] NVARCHAR(1000) NOT NULL,
    [html] TEXT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [FileConversion_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [FileConversion_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[sample3docx_schema] (
    [id] NVARCHAR(1000) NOT NULL,
    [content] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [sample3docx_schema_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Free_Blank_University_Admission_Form_Templatedocx_schema] (
    [id] NVARCHAR(1000) NOT NULL,
    [content] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Free_Blank_University_Admission_Form_Templatedocx_schema_pkey] PRIMARY KEY CLUSTERED ([id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
