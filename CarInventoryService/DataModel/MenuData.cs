namespace MenuService.DataModel
{
    public class MenuData
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public string Category { get; set; }
        public double Price {get; set; }

        public IFormFile Image { get; set; }

    }
}
