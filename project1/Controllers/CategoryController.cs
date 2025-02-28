﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project1.Data;
using project1.Models;
using project1.DTO;
using project1.Services;

namespace project1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {

        private readonly ILoggerServices _logger;

     


        private readonly ApplicationDbContext _context;

        public CategoryController(ApplicationDbContext context, ILoggerServices logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            var categories = await _context.Categories.ToListAsync();
            _logger.LogInfo("fetching data .......");
            return Ok(categories);
        }


        [HttpPost]
        public async Task<ActionResult<Category>> CreateCategiory(CategoryDTO categorydto)
        {

            var category = new Category
            {
                Name = categorydto.Name
            };
            await _context.Categories.AddAsync(category);
            _context.SaveChanges();

            return Ok(category);

        }


    } }

