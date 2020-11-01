CREATE PROCEDURE dbo.spUpdateInvoice 
    @Date DATETIME,
    @Customer NVARCHAR(max),
    @InvoiceNumber INT,
    @StartDate DATETIME,
    @EndDate DATETIME,
    @DateRange NVARCHAR(max),
    @UserId INT

--EXEC dbo.spUpdateInvoice @Date='2020-10-24', @Customer='None', @InvoiceNumber=6, @StartDate='2020-10-23', @EndDate='2020-10-26', @DateRange='2020/10/23 thru 2020/10/26', @UserId=3

AS
    DROP TABLE IF EXISTS #CustomerGroup

    SELECT CompanyName AS Customer INTO #CustomerGroup 
        FROM dbo.Customers
        WHERE Customers.[Group] = @Customer 

    DECLARE @Hours DECIMAL(18,2)

    UPDATE dbo.ClockItems 
        SET ClockItems.Invoiced = 0
        WHERE ClockItems.InvoiceNumber = @InvoiceNumber

    SET @Hours = (SELECT SUM(ClockItems.[Hours]) FROM dbo.ClockItems 
        WHERE (ClockItems.Customer = @Customer 
            AND ClockItems.userId = @UserId 
            AND ClockItems.Invoiced <> 1
            AND ClockItems.StartTime > @StartDate
            AND ClockItems.StartTime < @EndDate) OR (
                    ClockItems.Customer IN (SELECT Customer FROM #CustomerGroup) 
                AND ClockItems.userId = @UserId 
                AND ClockItems.Invoiced <> 1
                AND ClockItems.StartTime > @StartDate
                AND ClockItems.StartTime < @EndDate
            )) 

    UPDATE dbo.Invoices SET Invoices.[Hours] = @Hours
        WHERE Invoices.userId = @UserId 
        AND Invoices.InvoiceNumber = @InvoiceNumber

    UPDATE dbo.ClockItems 
        SET ClockItems.Invoiced = 1, ClockItems.InvoiceNumber = @InvoiceNumber
        WHERE (ClockItems.Customer = @Customer 
            AND ClockItems.userId = @UserId 
            AND ClockItems.Invoiced <> 1
            AND ClockItems.StartTime > @StartDate
            AND ClockItems.StartTime < @EndDate) OR (
                    ClockItems.Customer IN (SELECT Customer FROM #CustomerGroup) 
                AND ClockItems.userId = @UserId 
                AND ClockItems.Invoiced <> 1
                AND ClockItems.StartTime > @StartDate
                AND ClockItems.StartTime < @EndDate
            )

    SELECT TOP 1 * FROM dbo.Invoices
        WHERE Invoices.userId = @UserId 
        AND Invoices.InvoiceNumber = @InvoiceNumber
GO
