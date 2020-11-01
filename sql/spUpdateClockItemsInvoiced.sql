CREATE PROCEDURE [dbo].[spUpdateClockItemsInvoiced] 
    @Date DATETIME,
    @Invoiced BIT,
    @Customer NVARCHAR(max),
    @InvoiceNumber INT,
    @StartDate DATETIME,
    @EndDate DATETIME,
    @DateRange NVARCHAR(max),
    @UserId INT

--EXEC dbo.spUpdateClockItemsInvoiced @Date='2020-10-24', @Invoiced=1, @Customer='None', @InvoiceNumber=5, @StartDate='2020-10-23', @EndDate='2020-10-26', @DateRange='2020/10/23 thru 2020/10/26', @UserId=3

AS
    DROP TABLE IF EXISTS #CustomerGroup

    SELECT CompanyName AS Customer INTO #CustomerGroup 
        FROM dbo.Customers
        WHERE Customers.[Group] = @Customer 

    IF @Invoiced = 1
        BEGIN
            DECLARE @Hours DECIMAL

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

            UPDATE dbo.Settings
                SET Settings.LastInvoiceNumber = @InvoiceNumber
                WHERE Settings.userId = @UserId     
                    
            INSERT INTO dbo.Invoices 
                ([userId]
                ,[Date]
                ,[Customer]
                ,[DateRange]
                ,[InvoiceNumber]
                ,[Hours]
                ,[Paid])
                SELECT @UserId AS [userId]
                ,@Date AS [Date]
                ,@Customer AS Customer
                ,@DateRange AS [DateRange]
                ,@InvoiceNumber AS [InvoiceNumber]
                ,COALESCE(@Hours, 0) AS [Hours]
                ,0 AS [Paid]

            UPDATE dbo.ClockItems 
                SET ClockItems.Invoiced = @Invoiced, ClockItems.InvoiceNumber = @InvoiceNumber
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
        END
    ELSE
        BEGIN
            DELETE FROM dbo.Invoices
                WHERE Invoices.userId = @UserId 
                    AND Invoices.InvoiceNumber = @InvoiceNumber
            UPDATE dbo.ClockItems 
                SET ClockItems.Invoiced = @Invoiced, ClockItems.InvoiceNumber = null
                WHERE ClockItems.InvoiceNumber = @InvoiceNumber
        END

    SELECT TOP 1 * FROM dbo.Invoices 
        WHERE Invoices.userId = @UserId 
        AND Invoices.InvoiceNumber = @InvoiceNumber

GO
